import { HeroService } from "./hero.service";

describe('hero service', () => {
    let heroSvc

    beforeEach(() => {
        heroSvc = new HeroService();
    })

    it('should get a hero', () => {
        let hero;
        heroSvc.getHero(11).subscribe(h => {
            hero = h;
        })
        expect(hero.name).toBe('Dr Nice')
    })

    it('should have no messages on construction', () => {
        expect(heroSvc.messages.length).toBe(0);
    })

    it('should have 1 message after calling getHero once', () => {
        heroSvc.getHero(11).subscribe(h => {
        })
        
        expect(heroSvc.messages.length).toBe(1)
    })

    it('should have 1 message with the content "Getting Hero 11" after calling getHero once with 11', () => {
        heroSvc.getHero(11).subscribe(h => {
        })
        
        expect(heroSvc.messages[0]).toContain("Getting Hero 11")
    })

    it('should clear out all messages when clear is called', () => {
        heroSvc.getHero(11).subscribe(h => {
        })

        heroSvc.clearMessages();

        expect(heroSvc.messages.length).toBe(0);
    })


})


/*

need to log messages to a message list

*/