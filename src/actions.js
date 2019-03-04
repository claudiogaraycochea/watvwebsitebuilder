const openSession = (userFirstname) => {
  return {
    type: 'OPEN_SESSION',
    userFirstname
  };
}

const test = (userFirstname) => {
  return {
    type: 'SESSION_OPEN',
    userFirstname
  };
}

export { openSession, test }