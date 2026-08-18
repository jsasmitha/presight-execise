import db from '../db/database.js';

const USER_COUNT = 5000;
const MIN_AGE = 18;
const MAX_AGE = 75;

const firstNames = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava',
  'Ethan', 'Sophia', 'Lucas', 'Mia', 'Leo',
  'Isabella', 'James', 'Amelia', 'Daniel', 'Charlotte',
  'Adam', 'Sara', 'David', 'Nora',
  'Arjun', 'Priya', 'Rahul', 'Aisha', 'Omar', 'Fatima',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones',
  'Garcia', 'Miller', 'Davis', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Martin', 'Lee',
  'Patel', 'Sharma', 'Khan', 'Nair', 'Singh',
];

const nationalities = [
  'Indian', 'Emirati', 'British', 'American', 'Canadian', 'Australian', 'French', 'German',
  'Italian', 'Spanish', 'Japanese', 'Korean', 'Brazilian', 'Mexican', 'Egyptian', 'Jordanian',
  'Lebanese', 'Pakistani', 'Filipino', 'Singaporean',
];

const hobbies = [
  'Reading', 'Running', 'Swimming', 'Cycling', 'Hiking', 'Gaming', 'Photography', 'Cooking',
  'Travel', 'Music', 'Movies', 'Yoga', 'Football', 'Badminton', 'Tennis', 'Painting', 'Dancing',
  'Gardening', 'Chess', 'Writing', 'Camping', 'Fishing', 'Fitness', 'Basketball', 'Coding',
  'Drawing', 'Singing', 'Surfing', 'Climbing', 'Kayaking',
];

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomHobbies(): string[] {
  const hobbyCount = randomNumber(0, 10);
  const selected = new Set<string>();

  while (selected.size < hobbyCount) {
    selected.add(randomItem(hobbies));
  }

  return [...selected];
}

const clearDatabase = db.transaction(() => {
  db.exec(`
    DELETE FROM user_hobbies;
    DELETE FROM users;
    DELETE FROM hobbies;
    DELETE FROM sqlite_sequence
    WHERE name IN ('users', 'hobbies');
  `);
});

const seedDatabase = db.transaction(() => {
  const insertHobby = db.prepare(`
    INSERT INTO hobbies (name)
    VALUES (?)
  `);

  for (const hobby of hobbies) {
    insertHobby.run(hobby);
  }

  const hobbyRows = db.prepare(`
    SELECT id, name
    FROM hobbies
  `).all() as {
    id: number;
    name: string;
  }[];

  const hobbyIdByName = new Map(
    hobbyRows.map(hobby => [hobby.name, hobby.id]),
  );

  const insertUser = db.prepare(`
    INSERT INTO users (
      avatar,
      first_name,
      last_name,
      age,
      nationality
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  const insertUserHobby = db.prepare(`
    INSERT INTO user_hobbies (
      user_id,
      hobby_id
    )
    VALUES (?, ?)
  `);

  for (let i = 0; i < USER_COUNT; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const fullName = `${firstName} ${lastName}`;

    const avatar = `https://api.dicebear.com/10.x/initials/svg?seed=${encodeURIComponent(
      `${fullName}-${i}`,
    )}`;

    const result = insertUser.run(
      avatar,
      firstName,
      lastName,
      randomNumber(MIN_AGE, MAX_AGE),
      randomItem(nationalities),
    );

    const userId = Number(result.lastInsertRowid);
    const selectedHobbies = getRandomHobbies();

    for (const hobby of selectedHobbies) {
      const hobbyId = hobbyIdByName.get(hobby);

      if (hobbyId !== undefined) {
        insertUserHobby.run(userId, hobbyId);
      }
    }
  }
});

try {
  clearDatabase();
  seedDatabase();

  const usersCount = db.prepare(`
    SELECT COUNT(*) AS count
    FROM users
  `).get() as { count: number };

  const hobbiesCount = db.prepare(`
    SELECT COUNT(*) AS count
    FROM hobbies
  `).get() as { count: number };

  console.log('Database seeded successfully.');
  console.log(`Users: ${usersCount.count}`);
  console.log(`Hobbies: ${hobbiesCount.count}`);
} catch (error) {
  console.error('Database seeding failed:', error);
  process.exit(1);
}
