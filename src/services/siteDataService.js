// TODO: Update for actual database
const _siteData = {
    title: 'Example site',
    description: 'An example of a React frontend / express backend application'
}

/**
 * Returns the site data map
 * @returns {any}
 */
export const getSiteData = () => {
    return _siteData
}

/**
 * Update the page title or description
 * @param {{title: string | undefined, description: string | undefined}} param0 
 */
export const setSiteData = ({title, description}) => {
    _siteData.title = title === undefined ? _siteData.title : title

    _siteData.description = description === undefined ? _siteData.description : description
}

const _siteVisit = {
    count: 0
}

/**
 * Get the number of times the site has been visited
 * @returns {number}
 */
export const getSiteVisitCount = () => {
    return _siteVisit.count
}

/**
 * Increment the site visit count
 */
export const incrementSiteVisitCount = () => {
    _siteVisit.count++
}