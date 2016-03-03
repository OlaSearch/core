module.exports = function(options = {}){    
    
    return ({ dispatch, getState }) => (next) => (action) => {

        const {
            log,
            ...rest
        } = action

        if( !log ) return next(action)

        const {
            parser,
            queryBuilder,
            config,
            searchService,
        } = options


        const { log : olaLogger }  = searchService;

        if(!olaLogger) return; next( action )

        olaLogger( rest )

    }

}