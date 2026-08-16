# 3Sum (LeetCode #3)
- **Difficulty**: Medium
- **Pattern**: Two Pointers
- **Link**: [3Sum](https://leetcode.com/problems/3sum/)

## (i) Intuition
Sort the array first. Fix one element `nums[i]`, then use Two Pointers (`left` and `right`) to find pairs that sum to `-nums[i]`. Skip duplicates to guarantee unique triplets.

## (ii) Approach
Sort `nums`. Iterate `i` from `0` to `n-3`. If `nums[i] > 0`, break early. Skip duplicate `nums[i]`. Set `left = i + 1` and `right = n - 1`. While `left < right`, check sum. If sum < 0, increment `left`. If sum > 0, decrement `right`. If sum == 0, save triplet and advance pointers past duplicates.

## (iii) Algorithm
1. Sort the array `nums` in ascending order.
2. Iterate `i` from 0 to `nums.length - 2`.
3. Skip duplicate values for `nums[i]`.
4. Set two pointers: `left = i + 1` and `right = nums.length - 1`.
5. Compute `sum = nums[i] + nums[left] + nums[right]`.
6. Adjust pointers: increment `left` if sum < 0, decrement `right` if sum > 0.
7. If sum == 0, record triplet and skip adjacent duplicates for both `left` and `right`.

## (iv) Complexity Analysis
- **Time Complexity**: O(N)
- **Space Complexity**: O(1)

## (v) Solutions
- [C++ Solution](cpp/solution.cpp)
- [Java Solution](java/solution.java)
- [Python Solution](python/solution.py)
- [JavaScript Solution](javascript/solution.js)

## (vi) Summary
**Key Takeaway**: Sort array first, fix 1st number, then use 2-pointer squeeze. Remember duplicate skipping!
