import eventEmitter from "./eventEmitter.js";

const registerUser = (username, email) => {
  console.log(`User ${username} registered successfully!`);
  // Emit the event after user registration
  eventEmitter.emit('userRegistered', { username, email });
};

export default registerUser;