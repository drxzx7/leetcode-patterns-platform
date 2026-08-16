# Linked List Cycle - Python Solution
# Linked List Cycle - Optimal Python Solution (Linked List)
from typing import List, Dict, Optional

class Solution:
    def linkedlistcycle(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Linked List traversal
        for num in nums:
            result += num
            
        return result
