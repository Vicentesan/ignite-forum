import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { MakeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const newAnswerComments = MakeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(newAnswerComments)

    await sut.execute({
      answerCommentId: newAnswerComments.id.toString(),
      authorId: newAnswerComments.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer comment from another user', async () => {
    const newAnswerComments = MakeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(newAnswerComments)

    expect(async () => {
      return await sut.execute({
        answerCommentId: newAnswerComments.id.toString(),
        authorId: 'diff-author',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
