

export default function SubjectSelect(item) {
    let subjects=[];
    switch (item) {
        case 'Art specialist':
        return subjects=['Art'];
       
        case 'Political specialist':
        return subjects=['Politic','Social'];

        case 'Doctor':
        return subjects=['Medical','Nutrition'];

        case 'Nutrisitionist':
        return subjects=['Nutrition'];

        case 'Journalist':
        return subjects=['worldy','Social','Culture'];

        case 'Educational':
        return subjects=['Education','Social'];

        case 'Beauty specialist':
        return subjects=['Beauty'];
        
    }
    return subjects
    
}
