# Two Sum (LeetCode #1)
- **Difficulty**: Easy
- **Pattern**: Two Pointers
- **Link**: [Two Sum](https://leetcode.com/problems/two-sum/)

## (i) Intuition
Instead of nested loops O(N²), store each number's complement (target - num) in a Hash Map for instant O(1) lookups.

## (ii) Approach
Single-pass Hash Table. As we iterate through `nums`, we calculate `complement = target - nums[i]`. If `complement` exists in our hash table, we found our pair! Otherwise, store `nums[i]: i`.

## (iii) Algorithm
1. Initialize an empty HashMap `map` to store {number: index}.
2. Loop through `nums` with index `i`.
3. Calculate `complement = target - nums[i]`.
4. If `complement` exists in `map`, return `[map.get(complement), i]`.
5. Otherwise, insert `map.put(nums[i], i)`.
6. Return empty array if no pair found.

## (iv) Complexity Analysis
- **Time Complexity**: O(N)
- **Space Complexity**: O(1)

## (v) Solutions
- [C++ Solution](cpp/solution.cpp)
- [Java Solution](java/solution.java)
- [Python Solution](python/solution.py)
- [JavaScript Solution](javascript/solution.js)

## (vi) Summary
**Key Takeaway**: Trade O(N) space for O(N) time complexity using a Hash Map to store complement indices.
