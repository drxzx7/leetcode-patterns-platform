# Word Break (LeetCode #90)
- **Difficulty**: Medium
- **Pattern**: Dynamic Programming
- **Link**: [Word Break](https://leetcode.com/problems/word-break/)

## (i) Intuition
The core intuition for 'Word Break' relies on applying the **Dynamic Programming** paradigm. By recognizing key invariants and invariants in the problem constraints, we avoid brute-force computational overhead.

## (ii) Approach
We maintain structured invariants while processing input. For **Dynamic Programming**, we systematically scan, filter, or update state variables to achieve optimum runtime complexity.

## (iii) Algorithm
1. Initialize state pointers or data containers required for Dynamic Programming.
2. Iterate through input collection while maintaining problem invariants.
3. Check boundary conditions and update intermediate target metrics.
4. Return final calculated result or optimum configuration.

## (iv) Complexity Analysis
- **Time Complexity**: O(N)
- **Space Complexity**: O(N)

## (v) Solutions
- [C++ Solution](cpp/solution.cpp)
- [Java Solution](java/solution.java)
- [Python Solution](python/solution.py)
- [JavaScript Solution](javascript/solution.js)

## (vi) Summary
**Key Takeaway for Word Break**: Remember to utilize **Dynamic Programming** whenever given sorted data, contiguous sub-arrays, or optimal decision choices. Keep track of edge cases like empty inputs or single elements.
