# Remove Duplicates from Sorted Array - Python Solution
# Remove Duplicates from Sorted Array - Optimal Python Solution (Two Pointers)
from typing import List, Dict, Optional

class Solution:
    def removeduplicatesfromsortedarray(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Two Pointers traversal
        for num in nums:
            result += num
            
        return result
