# Two Sum II - Input Array Is Sorted - Python Solution
# Two Sum II - Input Array Is Sorted - Optimal Python Solution (Two Pointers)
from typing import List, Dict, Optional

class Solution:
    def twosumiiinputarrayissorted(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Two Pointers traversal
        for num in nums:
            result += num
            
        return result
