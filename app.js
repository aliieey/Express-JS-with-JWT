const express = require("express");
// console.log(express);
const bodyParser = require("body-parser");
let JWT = require("jsonwebtoken");
const app = express();
const port = 4000;
const secretKey = "abcxyzhtc123321213321";
app.use(bodyParser.json());

// GPT data

let gptData = {
  abdullah: {
    email: "abdullah@gmail.com",
    password: "abd123",
    posts: [
      {
        post: 1,
        content: "This is the first post from Abdullah",
        category: "text",
        likes: {
          likedNumber: 3,
          likedBy: ["meesum", "ali", "rafay"],
        },
        comments: [
          {
            commentNumber: 1,
            userId: "meesum",
            comment: "Amazing post, Abdullah!",
          },
        ],
      },
      {
        post: 2,
        content: "Abdullah's second post",
        category: "text",
        likes: {
          likedNumber: 2,
          likedBy: ["rafay", "usman"],
        },
        comments: [
          {
            commentNumber: 1,
            userId: "rafay",
            comment: "Interesting thoughts!",
          },
        ],
      },
    ],
  },
  meesum: {
    email: "meesum@gmail.com",
    password: "mee123",
    posts: [
      {
        post: 1,
        content: "This is the first post from Meesum",
        category: "text",
        likes: {
          likedNumber: 4,
          likedBy: ["abdullah", "ali", "rafay", "usman"],
        },
        comments: [
          {
            commentNumber: 1,
            userId: "abdullah",
            comment: "I love this, Meesum!",
          },
        ],
      },
    ],
  },
  ali: {
    email: "ali@gmail.com",
    password: "ali123",
    posts: [
      {
        post: 1,
        content: "This is Ali's first post",
        category: "text",
        likes: {
          likedNumber: 3,
          likedBy: ["abdullah", "rafay", "usman"],
        },
        comments: [
          {
            commentNumber: 1,
            userId: "abdullah",
            comment: "Great post, Ali!",
          },
        ],
      },
    ],
  },
  rafay: {
    email: "rafay@gmail.com",
    password: "raf123",
    posts: [
      {
        post: 1,
        content: "Rafay's first post",
        category: "text",
        likes: {
          likedNumber: 2,
          likedBy: ["abdullah", "meesum"],
        },
        comments: [
          {
            commentNumber: 1,
            userId: "meesum",
            comment: "I like this!",
          },
        ],
      },
    ],
  },
  dilshad: {
    email: "dilshad@gmail.com",
    password: "dil123",
    posts: [
      {
        post: 1,
        content: "First post from Dilshad",
        category: "text",
        likes: {
          likedNumber: 2,
          likedBy: ["rafay", "usman"],
        },
        comments: [
          {
            commentNumber: 1,
            userId: "rafay",
            comment: "Very well written!",
          },
        ],
      },
    ],
  },
  jamsheed: {
    email: "jamsheed@gmail.com",
    password: "jam123",
    posts: [
      {
        post: 1,
        content: "Jamsheed's first post",
        category: "text",
        likes: {
          likedNumber: 3,
          likedBy: ["abdullah", "meesum", "rafay"],
        },
        comments: [
          {
            commentNumber: 1,
            userId: "abdullah",
            comment: "Amazing work!",
          },
        ],
      },
    ],
  },
  usman: {
    email: "usman@gmail.com",
    password: "usm123",
    posts: [
      {
        post: 1,
        content: "Usman's first post",
        category: "text",
        likes: {
          likedNumber: 2,
          likedBy: ["abdullah", "meesum"],
        },
        comments: [
          {
            commentNumber: 1,
            userId: "meesum",
            comment: "Good work, Usman!",
          },
        ],
      },
    ],
  },
  ahmed: {
    email: "ahmed@gmail.com",
    password: "ahm123",
    posts: [
      {
        post: 1,
        content: "Ahmed's first post",
        category: "text",
        likes: {
          likedNumber: 1,
          likedBy: ["rafay"],
        },
        comments: [
          {
            commentNumber: 1,
            userId: "rafay",
            comment: "Great job, Ahmed!",
          },
        ],
      },
    ],
  },

  ibrar: {
    email: "ibrar@gmail.com",
    password: "ibr123",
    posts: [
      {
        post: 1,
        content: "First post from Ibrar",
        category: "text",
        likes: {
          likedNumber: 3,
          likedBy: ["abdullah", "rafay", "usman"],
        },
        comments: [
          {
            commentNumber: 1,
            userId: "usman",
            comment: "Nice post!",
          },
        ],
      },
    ],
  },
  afaq: {
    email: "afaq@gmail.com",
    password: "afa123",
    posts: [
      {
        post: 1,
        content: "Afaq's first post",
        category: "text",
        likes: {
          likedNumber: 2,
          likedBy: ["abdullah", "ali"],
        },
        comments: [
          {
            commentNumber: 1,
            userId: "ali",
            comment: "Good content!",
          },
        ],
      },
    ],
  },
};

app.post("/login", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  for (const gptUser in gptData) {
    if (gptData[gptUser].email == email && gptData[gptUser].password == pass) {
      let gptUserEmail = gptData[gptUser].email;
      let token = JWT.sign({ email: gptUserEmail }, secretKey);
      return res.status(200).json({
        message: "Login successfully",
        token,
      });
    } else {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
  }
});

// Create a middleware that can authenticate user come with token or not

function Authencation(req, res, next) {
  //  console.log("middleWare is working here ");
  if (req.headers.token) {
    try {
      let decoded = JWT.verify(req.headers.token, secretKey);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
  } else {
    return res.status(401).json({
      message: "Not Logged in",
    });
  }
}

// Authencation();

app.get("/isLoggedIn", Authencation, (req, res) => {
  let user = req.user;
  return res.status(200).json({
    message: "User is loggin",
    user,
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
