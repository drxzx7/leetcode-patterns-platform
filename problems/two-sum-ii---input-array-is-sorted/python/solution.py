# Two Sum II - Input Array Is Sorted - Python Solution
# Two Sum II - Input Array Is Sorted - Optimal Python Solution
from typing import List, Dict, Optional

class Solution:
    def solve(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Optimal Two Pointers traversal
        for i, val in enumerate(nums):
            result += val
            
        return result
