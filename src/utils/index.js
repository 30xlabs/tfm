import * as sanitizeHtml from "sanitize-html"

//firebase
import db from "../config/firebase"
import { addDoc, collection, query, where, getDocs } from "firebase/firestore"

export const purifyHtml = str => sanitizeHtml(str)

export function removeTags(str) {
  if (str === null || str === "") return false
  else str = str.toString()
  return purifyHtml(str.replace(/(<([^>]+)>)/gi, ""))
}

export async function checkIfEmailExists(email) {
  const dataRef = collection(db, "news-letter")
  const q = query(dataRef, where("email", "==", email))
  const querySnapshot = await getDocs(q)
  return querySnapshot.size !== 0
}

export async function insertNewsLetterRecord({ email, name }) {
  const dataRef = collection(db, "news-letter")
  await addDoc(dataRef, { name, email })
}

export function extractSubstring(input) {
  const match = input.match(/\/(.*?)\//)
  if (match && match[1]) {
    return match[1]
  } else {
    return input // Return the original string if no match is found
  }
}
