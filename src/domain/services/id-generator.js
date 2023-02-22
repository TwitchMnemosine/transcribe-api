const idGenerator = ({uuidv4}) => {
  return {
    generate: () => uuidv4(),
  }
}

module.exports = idGenerator;