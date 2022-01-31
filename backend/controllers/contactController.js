import asyncHandler from "express-async-handler";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const getContactList = asyncHandler(async (req, res) => {
  var userid = req.query.userid;

  try {
    const result = await db.query(
      "select contact_info.*, phone_numbers.*  from contact_info inner join phone_numbers on contact_info.id =phone_numbers.contact_id where contact_info.user_id = $1;",
      [userid]
    );
    const contacts = result.rows.map((contact) => {
      contact.phone_id = contact.id;

      //deleting phone table id
      delete contact.id;

      return contact;
    });
    res.json({ success: true, contacts: contacts });
  } catch (error) {
    res.json({ success: false, userExist: false });
  }
});

export const createContact = asyncHandler(async (req, res) => {
  const { fullName, email, phone, userId } = req.body;

  try {
    let contactValues = [
      fullName,
      email,
      userId,
      new Date().toLocaleString(),
      new Date().toLocaleString(),
    ];
    const contactResult = await db.query(
      "INSERT INTO contact_info(full_name, email, user_id, created_at, updated_at  ) VALUES($1, $2,$3,$4,$5)RETURNING *;",
      contactValues
    );
    const contact = contactResult.rows[0];
    const phoneValues = [
      phone,
      contact.id,
      new Date().toLocaleString(),
      new Date().toLocaleString(),
    ];
    const phoneResult = await db.query(
      "INSERT INTO phone_numbers(phone,contact_id,created_at,updated_at) VALUES($1,$2,$3,$4)RETURNING *;",
      phoneValues
    );

    const savedPhone = phoneResult.rows[0];
    const savedContact = { ...contact, ...savedPhone };
    savedContact.phone_id = savedContact.id;

    //deleting phone table id
    delete savedContact.id;

    res.json({ success: true, contact: savedContact });
  } catch (error) {
    res.status(400).send({ success: false });
  }
});

export const updateContact = asyncHandler(async (req, res) => {
  const { fullName, email, phone, contactid, phoneid } = req.body;

  try {
    let contactValues = [
      fullName,
      email,
      new Date().toLocaleString(),
      contactid,
    ];
    const contactResult = await db.query(
      "UPDATE contact_info SET full_name =$1, email =$2, updated_at=$3  where id=$4 RETURNING *;",
      contactValues
    );

    const phoneValues = [phone, new Date().toLocaleString(), phoneid];
    const phoneResult = await db.query(
      "UPDATE phone_numbers SET phone =$1, updated_at=$2 where id = $3 RETURNING *;",
      phoneValues
    );

    const contact = contactResult.rows[0];
    const savedPhone = phoneResult.rows[0];

    const savedContact = { ...contact, ...savedPhone };
    savedContact.phone_id = savedContact.id;
    delete savedContact.id;
    res.json({ success: true, contact: savedContact });
  } catch (error) {
    res.status(400).send({ success: false });
  }
});

export const deleteContact = asyncHandler(async (req, res) => {
  const { contactid, phoneid } = req.body;

  try {
    const phoneValues = [phoneid];

    const phoneResult = await db.query(
      "DELETE from phone_numbers where id = $1;",
      phoneValues
    );

    const contactValues = [contactid];

    const contactResult = await db.query(
      "DELETE from contact_info  where id=$1 ;",
      contactValues
    );

    res.json({ success: true });
  } catch (error) {
    res.status(400).send({ success: false });
  }
});
