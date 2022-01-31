import asyncHandler from "express-async-handler";
import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const checkUserExists = asyncHandler(async (req, res) => {
  var email = req.query.email;

  try {
    const result = await db.query("select * from users where email = $1;", [
      email,
    ]);
    if (result.rows.length > 0) {
      res.json({ success: true, userExist: true, user: result.rows[0] });
    } else {
      res.json({ success: false, userExist: false });
    }
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
});

//getUserByEmail function to retrieve user by id
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const result = await db.query("select * from users where email = $1;", [
      email,
    ]);
    const user = result.rows[0];
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "10h",
        }
      );

      // save user token
      user.token = token;

      // user
      if (user.verified === true) {
        res.status(200).json({ success: true, user });
      } else {
        res
          .status(200)
          .json({ success: false, error: "Please verify account" });
      }
    }
    // res.status(400).send("Invalid Credentials");
    return res
      .status(200)
      .json({ success: false, error: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
});

export const register = asyncHandler(async (req, res) => {
  const { email, password, fullName } = req.body;

  if (!(email && password && fullName)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const encryptedPassword = await bcrypt.hash(password, salt);
  const verificationToken = (Math.random() + 1).toString(36).substring(2);

  let values = [
    fullName,
    email,
    encryptedPassword,
    false,
    verificationToken,
    new Date().toLocaleString(),
    new Date().toLocaleString(),
  ];
  try {
    const result = await db.query(
      "INSERT INTO users(full_name, email, password, verified,verification_token,created_at, updated_at  ) VALUES($1, $2,$3,$4,$5,$6,$7)RETURNING *;",
      values
    );
    if (result.rows) {
      res.json({ success: true, user: result.rows[0] });
    }
  } catch (error) {
    return res.status(400).send({ error: "Already registered" });
  }
});

export const verifyAccount = asyncHandler(async (req, res) => {
  const { usertoken, email } = req.query;
  try {
    const result = await db.query(
      "select * from users where email = $1 AND verification_token = $2;",
      [email, usertoken]
    );
    if (result && result.rows.length > 0) {
      const user = result.rows[0];
      if (user.verified === false) {
        const updatedUser = await db.query(
          "UPDATE users SET verified = true WHERE ID = $1",
          [user.id]
        );
        res.json({ success: true, updatedUser });
      } else {
        res.json({ success: false, error: "Already confirmed account " });
      }
    }
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
  res.status(200).json({ error: "Wrong token" });
});
