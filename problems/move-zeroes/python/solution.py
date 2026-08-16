# Move Zeroes - Python Solution
# Move Zeroes - Optimal Python Solution (Two Pointers)
from typing import List, Dict, Optional

class Solution:
    def movezeroes(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Two Pointers traversal
        for num in nums:
            result += num
            
        return result
