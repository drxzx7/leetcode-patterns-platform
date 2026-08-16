# Sort Colors - Python Solution
# Sort Colors - Optimal Python Solution (Two Pointers)
from typing import List, Dict, Optional

class Solution:
    def sortcolors(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Two Pointers traversal
        for num in nums:
            result += num
            
        return result
