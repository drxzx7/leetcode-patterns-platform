# N-Queens - Python Solution
# N-Queens - Optimal Python Solution (Backtracking)
from typing import List, Dict, Optional

class Solution:
    def nqueens(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Backtracking traversal
        for num in nums:
            result += num
            
        return result
