const _siteData = {
    title: 'Example site',
    description: 'An example of a React frontend / express backend application'
}

export const getSiteData = () => {
    return _siteData
}

export const setSiteData = ({title, description}) => {
    _siteData.title = title === undefined ? _siteData.title : title

    _siteData.description = description === undefined ? _siteData.description : description
}

const _siteVisit = {
    count: 0
}

export const getSiteVisitCount = () => {
    return _siteVisit.count
}

export const incrementSiteVisitCount = () => {
    _siteVisit.count++
}