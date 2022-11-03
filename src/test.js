function find_max(nums) {
    let max_num = Number.NEGATIVE_INFINITY; // smaller than all other numbers
    for (let num of nums) {
        if (num > max_num) {
            max_num = num
        }
    }
    console.log(max_num);
}

nums = [10, 20, 30, 40, 50]
find_max(nums)