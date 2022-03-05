const signUpSchema = {
  tags: ["Authentication"],
  description: "User registration endpoint",
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      username: { type: "string" },
      password: { type: "string" },
    },
    required: ["name", "username", "password"],
  },
  response: {
    201: {
      description: "Successful sign-up",
      type: "object",
      properties: {
        accessToken: { type: "string" },
        refreshToken: { type: "string" },
      },
    },
    422: {
      description: "Failed sign-up attempt",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const loginSchema = {
  tags: ["Authentication"],
  description: "User login endpoint",
  body: {
    type: "object",
    properties: {
      username: { type: "string" },
      password: { type: "string" },
    },
    required: ["username", "password"],
  },
  response: {
    201: {
      description: "Successful sign-in",
      type: "object",
      properties: {
        accessToken: { type: "string" },
        refreshToken: { type: "string" },
      },
    },
    401: {
      description: "Failed sign-in attempt",
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
  },
};

const getAllUsersSchema = {
  tags: ["Authentication"],
  description: "Get all users from the database",
  response: {
    200: {
      description:
        "Successfully retrieved some pre-existing users from the database",
      type: "object",
      properties: {
        result: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: { type: "string" },
              name: { type: "string" },
              username: { type: "string" },
              passwordHash: {
                type: "string",
              },
            },
          },
        },
        tokens: {
          type: "object",
          properties: {
            accessToken: {
              type: "string",
            },
            refreshToken: {
              type: "string",
            },
          },
        },
      },
    },
    404: {
      description: "No pre-existing users in the database",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const getUserSchema = {
  tags: ["Authentication"],
  description: "Get a user from the database by ID",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: {
      description:
        "Successfully retrieved a pre-existing user from the database",
      type: "object",
      properties: {
        _id: { type: "string" },
        name: { type: "string" },
        username: { type: "string" },
        passwordHash: {
          type: "string",
        },
      },
    },
    422: {
      description: "Invalid ObjectID format",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    404: {
      description: "No user exists with this ID",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const patchUserSchema = {
  tags: ["Authentication"],
  description: "Update an existing user data",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      username: { type: "string" },
      password: { type: "string" },
    },
  },
  response: {
    400: {
      description: "Failed patch attempt",
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
    422: {
      description: "Invalid ObjectID format",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    200: {
      description: "Successful patch attempt",
      type: "object",
      properties: {
        acknowledged: { type: "boolean" },
        modifiedCount: { type: "number" },
        upsertedId: { type: ["number", "null"] },
        upsertedCount: { type: "number" },
        matchedCount: { type: "number" },
      },
    },
  },
};

const deleteUserSchema = {
  tags: ["Authentication"],
  description: "Delete a user from the database",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      description: "Successfully deleted the user",
      type: "object",
      properties: {
        acknowledged: { type: "boolean" },
        deletedCount: { type: "number" },
      },
    },
    422: {
      description: "Invalid ObjectID format",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const logOutSchema = {};

module.exports = {
  signUpSchema,
  loginSchema,
  getAllUsersSchema,
  getUserSchema,
  patchUserSchema,
  deleteUserSchema,
  logOutSchema,
};
