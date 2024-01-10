import { MakeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      MakeQuestion({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryQuestionsRepository.create(
      MakeQuestion({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryQuestionsRepository.create(
      MakeQuestion({ createdAt: new Date(2022, 0, 23) }),
    )

    const questions = await sut.execute({
      page: 1,
    })

    expect(questions).toEqual(
      expect.objectContaining({
        questions: expect.arrayContaining([
          expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
          expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
          expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
        ]),
      }),
    )
  })
})
