import { Home } from "./pages/home"

describe('Home', () => {
    it('should display main page content', () => {
      Home().shouldShowHomePageElements()
    })
  })

export {}