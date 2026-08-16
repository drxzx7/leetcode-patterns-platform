# Decode Ways - Python Solution
# Decode Ways - Optimal Python Solution (Dynamic Programming)
from typing import List, Dict, Optional

class Solution:
    def decodeways(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Dynamic Programming traversal
        for num in nums:
            result += num
            
        return result
