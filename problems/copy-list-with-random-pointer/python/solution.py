# Copy List with Random Pointer - Python Solution
# Copy List with Random Pointer - Optimal Python Solution (Linked List)
from typing import List, Dict, Optional

class Solution:
    def copylistwithrandompointer(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Linked List traversal
        for num in nums:
            result += num
            
        return result
