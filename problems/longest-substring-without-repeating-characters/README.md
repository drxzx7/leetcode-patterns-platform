# Longest Substring Without Repeating Characters (LeetCode #11)
- **Difficulty**: Medium
- **Pattern**: Sliding Window
- **Link**: [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

## (i) Intuition
Use a sliding window `[left, right]`. Expand `right` pointer to include characters, and store character indices in a map. If a duplicate is encountered inside window, jump `left` pointer past previous instance.

## (ii) Approach
Maintain a hash map `charMap` storing character -> index. Move `right` pointer across string. If character at `right` is present in map and its index >= `left`, update `left = charMap[char] + 1`. Calculate `maxLength = max(maxLength, right - left + 1)`.

## (iii) Algorithm
1. Initialize `left = 0`, `maxLength = 0`, and Hash Map `map`.
2. Iterate `right` pointer from 0 to `s.length - 1`.
3. If character `s[right]` exists in `map` and its index >= `left`, set `left = map.get(s[right]) + 1`.
4. Update `map.put(s[right], right)`.
5. Compute current window size `right - left + 1` and update `maxLength`.
6. Return `maxLength`.

## (iv) Complexity Analysis
- **Time Complexity**: O(N)
- **Space Complexity**: O(N)

## (v) Solutions
- [C++ Solution](cpp/solution.cpp)
- [Java Solution](java/solution.java)
- [Python Solution](python/solution.py)
- [JavaScript Solution](javascript/solution.js)

## (vi) Summary
**Key Takeaway**: Sliding window with hash map storing indices achieves single pass O(N) efficiency.
