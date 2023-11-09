import React from "react"
import { Box, Avatar, Link, Text } from "theme-ui"

const ProfileCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        padding: 3,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: 8,
      }}
    >
      <Avatar
        src="https://www.kowthasaketh.com/static/me-ab2782b9c6764b949af65b5e8ea41b81.jpeg"
        alt="Saketh"
        sx={{
          width: 80,
          height: 80,
          border: "6px solid #00000008",
          filter: "grayscale(1)",
          boxShadow: "rgba(0, 0, 0, 0.125) 0px 4px 8px 0px",
        }}
      ></Avatar>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            fontSize: 18,
            fontWeight: "bold",
            margin: 0,
          }}
        >
          <Text sx={{ fontSize: "12px" }}>Author : </Text>Saketh
        </Box>
        <Box
          sx={{
            fontSize: 14,
            color: "textMuted",
            margin: 0,
          }}
        >
          Software @Observe.ai
        </Box>
        <Box
          sx={{
            marginTop: 2,
            a: { textDecoration: "none", color: "text" },
            "a:hover": { color: "primary" },
            textAlign: "center",
          }}
        >
          <Link href="https://in.linkedin.com/in/saketh-kowtha">LinkedIn</Link>
          <Text sx={{ mx: 2 }}>•</Text>
          <Link href="https://www.kowthasaketh.com/">Portfolio</Link>
          <Text sx={{ mx: 2 }}>•</Text>
          <Link href="https://github.com/saketh-kowtha">GitHub</Link>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileCard
