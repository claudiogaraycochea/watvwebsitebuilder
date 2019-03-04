const sessionOpen = (userFirstname) => {
  return {
    type: 'SESSION_OPEN',
    userFirstname
  };
}

const test = (userFirstname) => {
  return {
    type: 'SESSION_OPEN',
    userFirstname
  };
}

export { sessionOpen, test }