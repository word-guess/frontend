declare namespace Components {
  namespace Schemas {
    export interface CreateGuessDto {
      text: string
    }
    export interface Guess {
      id: number
      text: string
      similarity: number
      rank: number
    }
    export interface User {
      id: number
      createDate: string // date-time
    }
  }
}
declare namespace Paths {
  namespace GuessesControllerCreate {
    export type RequestBody = Components.Schemas.CreateGuessDto
    namespace Responses {
      export type $201 = Components.Schemas.Guess
    }
  }
  namespace GuessesControllerFindAll {
    namespace Responses {
      export type $200 = Components.Schemas.Guess[]
    }
  }
  namespace UsersControllerMe {
    namespace Responses {
      export type $200 = Components.Schemas.User
    }
  }
}
