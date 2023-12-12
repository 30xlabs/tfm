import * as sanitizeHtml from "sanitize-html"

//firebase
import db from "../config/firebase"
import { addDoc, collection, query, where, getDocs } from "firebase/firestore"

//utils
import { prop, toLower, trim, uniqBy, compose, pathEq } from "ramda"
import { logEvent as fbLogEvent } from "firebase/analytics"

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

export const createNode = source =>
  source.edges.map(({ node }) => ({
    ...node.frontmatter,
    id: node.id,
    body: node.excerpt,
  }))

const uniqByTitle = uniqBy(compose(trim, toLower, prop("title")))

export const getArticleData = data =>
  uniqByTitle([
    ...createNode(data.allMarkdownRemark),
    ...createNode(data.allBlogPost),
  ])

export const transformArticleData = data =>
  data.map(item => ({
    image: item.coverImg,
    title: item.title,
    body: item.body,
    showLink: true,
    id: item.id,
  }))

export const removeFrontMatter = markdownContent => {
  // Identify and remove front matter (text between "---" and "---")
  return markdownContent.replace(/^---[\s\S]*?---/, "")
}

export function frontmatterStringToJson(frontmatterString = "") {
  const frontmatterLines = frontmatterString.split("\n")
  const frontmatterJson = {}

  // Parse frontmatter lines until the first occurrence
  let firstFrontmatterFound = false
  frontmatterLines.forEach(line => {
    if (line === "---" && !firstFrontmatterFound) {
      firstFrontmatterFound = true
    } else if (firstFrontmatterFound) {
      const [key, value] = line.split(":")
      if (key && value) {
        const trimmedKey = key.trim()
        const trimmedValue = value.trim()
        frontmatterJson[trimmedKey] = trimmedValue
      }
    }
  })

  return frontmatterJson
}

export function parseStringToArray(inputString) {
  if (!inputString) return null
  try {
    // Remove square brackets and split by comma
    const array = inputString
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map(item => item.trim())

    return Array.isArray(array) ? array : []
  } catch (error) {
    console.error("Error parsing the string to array:", error.message)
    return []
  }
}

export const sortByDateInDesc = (a, b) =>
  new Date(b.publishedAt) - new Date(a.publishedAt)

const checkIsEnvProd = pathEq("production", ["GATSBY_ENV"])

export const logEvent = (event, payload) => {
  const isProd = checkIsEnvProd(process.env)
  if (isProd) fbLogEvent(event, payload)
  else console.log(event, payload)
}
