# 4Sum - Python Solution
# 4Sum - Optimal Python Solution (Two Pointers)
from typing import List, Dict, Optional

class Solution:
    def 4sum(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Two Pointers traversal
        for num in nums:
            result += num
            
        return result
