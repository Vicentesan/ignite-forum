import { MakeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { MakeQuestionAttachments } from 'test/factories/make-question-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository,
    )
  })

  it('should be able to edit a question', async () => {
    const newQuestion = MakeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)
    inMemoryQuestionAttachmentsRepository.items.push(
      MakeQuestionAttachments({
        attachmentId: new UniqueEntityId('1'),
        questionId: newQuestion.id,
      }),
      MakeQuestionAttachments({
        attachmentId: new UniqueEntityId('2'),
        questionId: newQuestion.id,
      }),
    )

    const result = await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
      title: 'new title',
      content: 'new content',
      attachmentsIds: ['1', '3'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'new title',
      content: 'new content',
    })
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = MakeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'diff-author',
      title: 'new title',
      content: 'new content',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
