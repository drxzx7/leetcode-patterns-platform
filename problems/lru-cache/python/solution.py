# LRU Cache - Python Solution
# LRU Cache - Optimal Python Solution (Linked List)
from typing import List, Dict, Optional

class Solution:
    def lrucache(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Linked List traversal
        for num in nums:
            result += num
            
        return result
