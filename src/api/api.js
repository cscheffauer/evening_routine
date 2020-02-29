export const getFirstPeople = async (link) => {
    let nextLink = "";
    let data = await fetch(link);
    let data_json = await data.json();
    let people = data_json.results;
    nextLink = await data_json.next;
    return { people, nextLink };
}

export const getMorePeople = async (link) => {
    let tempPeople = [];
    let nextLink = undefined;

    for (let i = 0; i < 6; i++) {
        link = (nextLink === undefined) ? link : nextLink;
        let data = await fetch(link);
        let data_json = await data.json();
        let morePeople = data_json.results;

        nextLink = await data_json.next;
        tempPeople = [...tempPeople, ...morePeople];
    }
    return tempPeople;
}


export const replaceSpeciesName = async (people) => {
    return await Promise.all(
        people.map(async (person, i) => {
            if (Array.isArray(person.species) && person.species.length) {

                let data = await fetch(person.species[0]);
                let data_json = await data.json();
                person.species = await data_json.name;
                return person;
            }
            else {
                return person;
            }
        })
    );
}
