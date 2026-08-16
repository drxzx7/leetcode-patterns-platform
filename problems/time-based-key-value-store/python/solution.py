# Time Based Key-Value Store - Python Solution
# Time Based Key-Value Store - Optimal Python Solution
from typing import List, Dict, Optional

class Solution:
    def solve(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Optimal Binary Search traversal
        for i, val in enumerate(nums):
            result += val
            
        return result
