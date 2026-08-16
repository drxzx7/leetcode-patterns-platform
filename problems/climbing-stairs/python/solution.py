# Climbing Stairs - Python Solution
# Climbing Stairs - Optimal Python Solution (Dynamic Programming)
from typing import List, Dict, Optional

class Solution:
    def climbingstairs(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Dynamic Programming traversal
        for num in nums:
            result += num
            
        return result
