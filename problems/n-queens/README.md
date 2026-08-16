# N-Queens (LeetCode #69)
- **Difficulty**: Hard
- **Pattern**: Backtracking
- **Link**: [N-Queens](https://leetcode.com/problems/n-queens/)

## (i) Intuition
The core intuition for 'N-Queens' relies on applying the **Backtracking** paradigm. By recognizing key invariants and invariants in the problem constraints, we avoid brute-force computational overhead.

## (ii) Approach
We maintain structured invariants while processing input. For **Backtracking**, we systematically scan, filter, or update state variables to achieve optimum runtime complexity.

## (iii) Algorithm
1. Initialize state pointers or data containers required for Backtracking.
2. Iterate through input collection while maintaining problem invariants.
3. Check boundary conditions and update intermediate target metrics.
4. Return final calculated result or optimum configuration.

## (iv) Complexity Analysis
- **Time Complexity**: O(N²)
- **Space Complexity**: O(N)

## (v) Solutions
- [C++ Solution](cpp/solution.cpp)
- [Java Solution](java/solution.java)
- [Python Solution](python/solution.py)
- [JavaScript Solution](javascript/solution.js)

## (vi) Summary
**Key Takeaway for N-Queens**: Remember to utilize **Backtracking** whenever given sorted data, contiguous sub-arrays, or optimal decision choices. Keep track of edge cases like empty inputs or single elements.
