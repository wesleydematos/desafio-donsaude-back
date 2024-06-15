import { faker } from '@faker-js/faker';
import dataSource from './typeOrm.migration-config';
import { Colaborator } from './entities/colaborators.entity';
import { hashSync } from 'bcrypt';

const createRandomColaborator = (i: number): Partial<Colaborator> => {
  return {
    isAllowed: faker.datatype.boolean(),
    name: i === 0 ? 'admin' : faker.person.fullName(),
    documentNumber: '11111111111',
    phone: '11999999999',
    email: i === 0 ? 'admin@mail.com' : faker.internet.email(),
    password: hashSync(i === 0 ? 'admin' : faker.internet.password(), 10),
    photo: faker.image.avatar(),
  };
};

const populateDatabase = async () => {
  try {
    await dataSource.initialize();

    const colaboratorRepository = dataSource.getRepository(Colaborator);

    for (let i = 0; i < 10; i++) {
      const newColaborator = createRandomColaborator(i);
      await colaboratorRepository.save(newColaborator);
    }

    console.log('Database has been populated with random colaborators');
  } catch (error) {
    console.error('Error populating the database', error);
  } finally {
    await dataSource.destroy();
  }
};

populateDatabase();
