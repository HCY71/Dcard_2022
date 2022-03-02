const variants = {
    pageVariants: {
        'initial': {
            opacity: 0,
            scale: 0.5,
        },
        'animate': {
            opacity: 1,
            scale: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: .15
            }
        },
        'exit': {
            opacity: 0,
        }
    },
    reposVariants: {
        'initial': {
            opacity: 0,
            scale: 0
        },
        'animate': {
            opacity: 1,
            scale: 1,
        }
    },
    backgroundVariants:{
        'exit': {
            opacity: 0
        }
    },
    loadingVariants: {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1,
            transition: {
                duration: .1
            }
        }
    }
}

export default variants;