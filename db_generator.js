module.exports = () => {
  const data = { reviews: [] };
  // Create 1000 users
  for (let i = 0; i < 10; i++) {
    data.reviews.push({
      id: i,
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu turpis, ullamcorper ac luctus nec, posuere quis nisi. Suspendisse potenti. Vestibulum in tincidunt leo. Vestibulum elementum aliquam nisl quis cursus. Aliquam elementum ipsum et massa pretium semper. Maecenas dictum lorem ac ultricies interdum. Suspendisse potenti. Fusce non erat ornare, dictum metus ut, ullamcorper velit. Curabitur consequat magna quis vehicula blandit. Sed sagittis id est rhoncus pharetra.",
      eventId: i,
      user: i,
    });
  }
  return data;
};
