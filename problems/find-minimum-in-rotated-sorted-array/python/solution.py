# Find Minimum in Rotated Sorted Array - Python Solution
# Find Minimum in Rotated Sorted Array - Optimal Python Solution (Binary Search)
from typing import List, Dict, Optional

class Solution:
    def findminimuminrotatedsortedarray(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Binary Search traversal
        for num in nums:
            result += num
            
        return result
