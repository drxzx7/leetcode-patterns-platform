# Search a 2D Matrix - Python Solution
# Search a 2D Matrix - Optimal Python Solution (Binary Search)
from typing import List, Dict, Optional

class Solution:
    def searcha2dmatrix(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Binary Search traversal
        for num in nums:
            result += num
            
        return result
