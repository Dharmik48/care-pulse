"use server";

import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import {
  DATABASE_ID,
  databases, DOCTOR_COLLECTION_ID,
  GUIDE_COLLECTION_ID,
} from "@/lib/appwrite.config";
import { ID } from "node-appwrite";
import {getDoctorByUserId} from "@/lib/actions/doctor.actions";

export const createGuide = async (title: string, body: string, userId: string) => {
  try {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const purifiedBody = purify.sanitize(body);

    const {doctor} = await getDoctorByUserId(userId)

    if(!doctor) return {error: 'User does not exist'}

    const guide = await databases.createDocument(
      DATABASE_ID!,
      GUIDE_COLLECTION_ID!,
      ID.unique(),
      { title, body: purifiedBody, doctor: doctor.$id }
    );

    await databases.updateDocument(DATABASE_ID!, DOCTOR_COLLECTION_ID!, doctor.$id, {
      guides: [...doctor.guides, guide.$id]
    })

    return {guide};
  } catch (error: any) {
    return { error: error.message || "Something went wrong" };
  }
};