# Search Insert Position - Python Solution
# Search Insert Position - Optimal Python Solution (Binary Search)
from typing import List, Dict, Optional

class Solution:
    def searchinsertposition(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Binary Search traversal
        for num in nums:
            result += num
            
        return result
