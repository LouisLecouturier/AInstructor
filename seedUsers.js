// "username": "string",
// "password": "string",
// "email": "string",
// "first_name": "string",
// "last_name": "string",
// "isTeacher": true

// Guy Liguili
// Alain Proviste
// Alain Terrieur
// Hugo Tique
// Sarah Croche
// Jean Bonbeur
// Léa Crobate
// Jacques Sonne
// Lucie Fer
// Camille Onette

const users = [
  [false, "Guy", "Liguili", "guy.liguily", "Test59Test!"],
  [false, "Alain", "Proviste", "alain.proviste", "Test59Test!"],
  [false, "Alain", "Terrieur", "alain.terrieur", "Test59Test!"],
  [false, "Hugo", "Tique", "hugo.tique", "Test59Test!"],
  [false, "Sarah", "Croche", "sarah.croche", "Test59Test!"],
  [false, "Jean", "Bonbeur", "jean.bonbeur", "Test59Test!"],
  [false, "Léa", "Crobate", "lea.crobate", "Test59Test!"],
  [false, "Jacques", "Sonne", "jacques.sonne", "Test59Test!"],
  [false, "Lucie", "Fer", "lucie.fer", "Test59Test!"],
  [false, "Camille", "Onette", "camille.onette", "Test59Test!"],
];

const seedUsers = async () => {
  for (let user of users) {
    await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isTeacher: user[0],
        first_name: user[1],
        last_name: user[2],
        password: user[4],
        email: `${user[3]}@gmail.com`,
      }),
    })
      .then(
        (res) =>
          res.ok && console.log(`seeded ${user[1]} ${user[2]} successfully`)
      )
      .catch((err) => console.log(`error while seeding ${user[1]} ${user[2]}`));
  }
  console.log(`seeded ${users.length} users successfully`);
};

seedUsers();
