const proxy = {skew: 0},
skewSetter = gsap.quickSetter(".boxImage","skewY","deg"),
clamp = gsap.utils.clamp(-20,20);

// skewSetter(-5.369)

gsap.registerPlugin(ScrollTrigger);


let sections = gsap.utils.toArray(".boxImage");

gsap.to(sections ,{
    xPercent: - 100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: '.container',
        pin: true,
        onUpdate:(self) =>{
            let skew = clamp(self.getVelocity() / 300);
            
            if(Math.abs(skew) > Math.abs(proxy.skew)){
                proxy.skew = skew;
                
                
                gsap.to(proxy, 
                {skew: 0,
                duration: .8,
                overwrite: true,
                ease: "power3",
                onUpdate: () => {
                    skewSetter(proxy.skew);
                }
                })
    
            }
        },
        scrub: 1,
        // snap: 1 / (sections.length - 1),
        end: ()=> "+=" +
        document.querySelector(".container").offsetWidth
        
    }
})