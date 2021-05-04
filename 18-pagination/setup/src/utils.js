const paginate = (followers) => {
    const itemsPerPage = 10
    const numbersOfPage = Math.ceil(followers.length/itemsPerPage)

    // creating as many sequences as number of pages (numbersOfPage) from followers array 
    // like:
    // [
    //    ['follower1','follower2', 'follower3','follower4', 'follower5',
    //     'follower6','follower7','follower8','follower9','follower10'],
    //    ['follower11','follower12','follower13','follower14','follower15']
    //]
    
    const newFollowers = Array.from({legth:numbersOfPage}, (_, index)=>{
        const start = index*itemsPerPage
        return followers.slice(start, start + itemsPerPage)
    })

    return newFollowers
}

export default paginate
