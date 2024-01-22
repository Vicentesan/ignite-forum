import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { MakeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const newQuestionComments = MakeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(newQuestionComments)

    await sut.execute({
      questionCommentId: newQuestionComments.id.toString(),
      authorId: newQuestionComments.authorId.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment from another user', async () => {
    const newQuestionComments = MakeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(newQuestionComments)

    expect(async () => {
      return await sut.execute({
        questionCommentId: newQuestionComments.id.toString(),
        authorId: 'diff-author',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
