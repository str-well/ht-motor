import { faker } from '@faker-js/faker'

export const users = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    username: faker.internet
      .username({ firstName, lastName })
      .toLocaleLowerCase(),
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    status: faker.helpers.arrayElement([
      'Ativo',
      'Inativo',
      'Convite enviado',
      'Suspenso',
    ]),
    role: faker.helpers.arrayElement([
      'Super-administrador',
      'Administrador',
      'Financeiro',
      'Gerente',
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
